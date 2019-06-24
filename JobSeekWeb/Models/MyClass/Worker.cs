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
        public static bool IsWorker(int asp_userId)
        {
            Nullable<int> result = new JobEntities().spWorker_Exist(asp_userId).FirstOrDefault();
            return result == 1 ? true : false;
        }
    }
}