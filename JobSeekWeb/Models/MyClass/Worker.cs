using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Worker
    {
        public int workerId { get; set; }
        public string fname { get; set; }
        public string mname { get; set; }
        public string lname { get; set; }
        public DateTime birthdate { get; set; }
        public string gender { get; set; }
        public string header { get; set; }
        public int asp_user_Id { get; set; }
        public string country { get; set; }
        public string cellnum { get; set; }

        public void UpdateProfileDetails()
        {
            new JobEntities().spWorker_updateDetails(
                workerId, fname, mname, lname, birthdate,
                gender, header, country, cellnum
                );
        }
        public static bool IsDetailsCompleted(int asp_userId)
        {
            var worker = new JobEntities().spWorker_getDetails(asp_userId).FirstOrDefault();
            var properties = worker.GetType().GetProperties();
            List<bool> completed = new List<bool>();
            foreach(PropertyInfo property in properties)
            {
               if (property.GetValue(worker) != null)
                {
                    completed.Add(true);
                }
                else
                {
                    completed.Add(false);
                }
            }
            return (completed.Contains(false)) ? false : true;
        }
    }
}