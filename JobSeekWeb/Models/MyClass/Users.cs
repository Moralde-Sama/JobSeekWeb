using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Users
    {
        public static bool IsWorker(int asp_userId)
        {
            Nullable<int> result = new JobEntities().spWorker_Exist(asp_userId).FirstOrDefault();
            return result == 1 ? true : false;
        }
    }
}