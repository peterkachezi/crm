using CustomerManager.BLL.Repositories.CustomerModule;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.ComponentModel;
using System.Drawing;
using LicenseContext = OfficeOpenXml.LicenseContext;

namespace CustomerManager.Controllers
{
    public class CustomerReportController : Controller
    {
        private readonly ICustomerRepository customerRepository;

        public CustomerReportController(ICustomerRepository customerRepository)
        {
            this.customerRepository = customerRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GenerateCustomerReport(DateTime DateFrom, DateTime DateTo)
        {
            try
            {
                var endDate = DateTo.AddHours(23).AddMinutes(59).AddSeconds(59);

                var members =(await customerRepository.GetAll()).Where(x => x.CreatedDate >= DateFrom && x.CreatedDate <= endDate).ToList();

                if (members.Count == 0)
                {
                    TempData["ErrorDateReport"] = "There are no  report";

                    return RedirectToAction("Index", new { area = "Claims" });
                }

                var stream = new MemoryStream();

                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                using (var xlPackage = new ExcelPackage(stream))
                {
                    var worksheet = xlPackage.Workbook.Worksheets.Add("Users");

                    var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");

                    namedStyle.Style.Font.UnderLine = true;

                    namedStyle.Style.Font.Color.SetColor(Color.Blue);

                    const int startRow = 5;

                    var row = startRow;

                    //Create Headers and format them
                    worksheet.Cells["A1,B1,C1,D1,E1,F1"].Value = "List of Members";

                    using (var r = worksheet.Cells["A1:F1"])
                    {
                        r.Merge = true;

                        r.Style.Font.Color.SetColor(Color.White);

                        r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;

                        r.Style.Fill.PatternType = ExcelFillStyle.Solid;

                        r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
                    }

                    worksheet.Cells["A2"].Value = "FullName";

                    worksheet.Cells["B2"].Value = "PhoneNumber";

                    worksheet.Cells["C2"].Value = "EmailAddress";

                    worksheet.Cells["D2"].Value = "Designation";

                    worksheet.Cells["E2"].Value = "CreatedDate";

                    worksheet.Cells["F2"].Value = "Company";

                    worksheet.Cells["A2:F2"].Style.Fill.PatternType = ExcelFillStyle.Solid;

                    worksheet.Cells["A2:F2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));

                    worksheet.Cells["A2:F2"].Style.Font.Bold = true;

                    row = 3;

                    foreach (var user in members)
                    {
                        worksheet.Cells[row, 1].Value = user.FullName;

                        worksheet.Cells[row, 2].Value = user.PhoneNumber;

                        worksheet.Cells[row, 3].Value = user.EmailAddress;

                        worksheet.Cells[row, 4].Value = user.Designation;

                        worksheet.Cells[row, 5].Value = user.CreatedDate.ToShortDateString();

                        worksheet.Cells[row, 6].Value = user.Company;                  

                        row++;
                    }

                    // set some core property values
                    xlPackage.Workbook.Properties.Title = "MAKL";

                    xlPackage.Workbook.Properties.Author = "MAKL";

                    xlPackage.Workbook.Properties.Subject = "MAKL";
                    // save the new spreadsheet
                    xlPackage.Save();
                    // Response.Clear();
                }
                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "CustomerReport.xlsx");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                TempData["Error"] = "Something went wrong ,please contact system admin for assistance";

                return RedirectToAction("Login", "Account", new { area = "" });
            }
        }
    }
}
