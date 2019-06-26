using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Users
    {
        public static string GetWorkerName(int asp_userId)
        {
            var result = new JobEntities().spWorker_GetFullName(asp_userId).FirstOrDefault();
            return result ?? "";
        }
        public static bool IsWorker(int asp_userId)
        {
            Nullable<int> result = new JobEntities().spWorker_Exist(asp_userId).FirstOrDefault();
            return result == 1 ? true : false;
        }
        public static int GetWorkerOrCompanyId(int asp_userId)
        {
            Nullable<int> workerId = new JobEntities().spWorker_getWorkerId(asp_userId).FirstOrDefault();
            if(workerId != null)
            {
                return workerId.Value;
            }
            else
            {
                Nullable<int> companyId = new JobEntities().spCompany_getCompanyId(asp_userId).FirstOrDefault();
                if(companyId != null)
                {
                    return companyId.Value;
                }
                else
                {
                    return -1;
                }
            }
        }
    }
}