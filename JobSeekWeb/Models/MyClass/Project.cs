using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Project : Skills
    {
        public int perprojectId { get; set; }
        public string projTitle { get; set; }
        public string projDesc { get; set; }
        public string privacy { get; set; }
        public DateTime created { get; set; }
        public DateTime completed { get; set; }
        public int ownerId { get; set; }
        public bool isWorkerProj { get; set; }
        public HttpPostedFileBase[] files { get; set; }

        public tbl_personal_project AddPersonalProject()
        {
            tbl_personal_project project = new tbl_personal_project
            {
                title = projTitle,
                projectDesc = projDesc,
                ownerId = ownerId,
                privacy = privacy,
                isWorkerProj = isWorkerProj ? 1 : 0,
                created = created,
                completed = completed
            };
            db.tbl_personal_project.Add(project);
            db.SaveChanges();
            return project;
        }
    }
}