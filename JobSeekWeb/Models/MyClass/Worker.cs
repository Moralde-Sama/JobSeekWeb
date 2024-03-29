﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Worker : Skills
    {
        public int workerId { get; set; }
        public string fname { get; set; }
        public string mname { get; set; }
        public string lname { get; set; }
        public DateTime birthdate { get; set; }
        public string gender { get; set; }
        public string header { get; set; }
        public int asp_user_Id { get; set; }
        public string cellnum { get; set; }
        public int region { get; set; }
        public int province { get; set; }
        public int city { get; set; }
        public int brgy { get; set; }
        public string prof_path { get; set; }
        public string cover_path { get; set; }

        public void UpdateProfileDetails()
        {
            db.spWorker_updateDetails(
                workerId, fname, mname, lname, birthdate,
                gender, header, cellnum, region, province,
                city, brgy, prof_path, cover_path
                );
        }

        public void UpdatePersonalInfo()
        {
            db.spWorker_updatePersonalInfo(workerId,
                fname, mname, lname, gender, cellnum,
                birthdate, header);
        }
        public static bool IsDetailsCompleted(int asp_userId)
        {
            try
            {
                var worker = new JobEntities().spWorker_getDetails(asp_userId).FirstOrDefault();
                var properties = worker.GetType().GetProperties();
                List<bool> completed = new List<bool>();
                foreach (PropertyInfo property in properties)
                {
                    completed.Add(property.GetValue(worker) != null ? true : false);
                }
                return (completed.Contains(false)) ? false : true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static spWorker_getDetails_Result GetWorkerDetails(int asp_userId)
        {
            return new JobEntities().spWorker_getDetails(asp_userId).FirstOrDefault();
        }
    }
}