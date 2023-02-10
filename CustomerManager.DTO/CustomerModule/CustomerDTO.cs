namespace CustomerManager.DTO.CustomerModule
{
	public class CustomerDTO
	{
		public int CustomerID { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? FullName => FirstName + " " + LastName;
		public string? EmailAddress { get; set; }
		public string? PhoneNumber { get; set; }
		public string? Designation { get; set; }
		public string? Company { get; set; }
		public string? City { get; set; }
		public string? CollegeName { get; set; }
		public string? State { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public string? ModifidBy { get; set; }
		public string? CreatedBy { get; set; }
		public string? Source { get; set; }
        public byte IsActive { get; set; }
    }
}
