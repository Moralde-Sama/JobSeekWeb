using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Company : Category
    {
        public int companyId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string cellnumber { get; set; }
        public string business_email { get; set; }
        public int region { get; set; }
        public int province { get; set; }
        public int city { get; set; }
        public int brgy { get; set; }
        public string prof_path { get; set; }
        public string cover_path { get; set; }
        public int asp_user_Id { get; set; }

        public void UpdateDetails()
        {
            using(JobEntities db = new JobEntities())
            {
                tbl_company company = db.tbl_company.Find(companyId);
                company.name = name;
                company.description = description;
                company.cellnumber = cellnumber;
                company.categoryId = categoryId;
                company.business_email = business_email;
                company.region = region;
                company.province = province;
                company.city = city;
                company.brgy = brgy;
                company.prof_path = "/Uploads/Company/Profile/eriri.png";
                company.cover_path = "/Uploads/Company/Cover/kodaikana.jpg";
                db.Entry(company).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }
        public void UpdateCompanyInformation()
        {
            using(JobEntities db = new JobEntities())
            {
                tbl_company company = db.tbl_company.Find(companyId);
                company.name = name;
                company.categoryId = categoryId;
                company.description = description;
                company.cellnumber = cellnumber;
                company.business_email = business_email;
                db.Entry(company).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }
        public static spCompany_getDetails_Result GetCompanyDetails(int asp_userId)
        {
            using (JobEntities db = new JobEntities())
            {
                return db.spCompany_getDetails(asp_userId).FirstOrDefault();
            }
        }
        public static bool IsDetailsCompleted(int asp_userId)
        {
            var company_details = new JobEntities().spCompany_getDetails(asp_userId).FirstOrDefault();
            PropertyInfo[] properties = company_details.GetType().GetProperties();
            List<bool> completed = new List<bool>();
            foreach(PropertyInfo property in properties)
            {
                completed.Add(property.GetValue(company_details) != null ? true : false);
            }
            return completed.Contains(false) ? false : true;
        }
    }
}