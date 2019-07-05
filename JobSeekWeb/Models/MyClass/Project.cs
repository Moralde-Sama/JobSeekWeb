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
        public string projectDesc { get; set; }
        public string privacy { get; set; }
        public DateTime created { get; set; }
        public DateTime completed { get; set; }
        public int ownerId { get; set; }
        public bool isWorkerProj { get; set; }
        public int[] removeScreenShots { get; set; }
        public HttpPostedFileBase[] files { get; set; }

        public tbl_personal_project AddPersonalProject()
        {
            tbl_personal_project project = new tbl_personal_project
            {
                title = projTitle,
                projectDesc = projectDesc,
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
        public void UpdatePProjectDetails()
        {
            var proj = db.tbl_personal_project.Find(perprojectId);
            proj.title = projTitle;
            proj.projectDesc = projectDesc;
            proj.privacy = privacy;
            proj.created = created;
            proj.completed = completed;
            db.Entry(proj).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }
        public void RemovePProjectSkills()
        {
            if(removeSkill?.Length > 0)
            {
                foreach(int ppskillId in removeSkill)
                {
                    db.spProject_deleteSkill(ppskillId);
                }
            }
        }
        public List<string> RemoveScreenShots()
        {
            List<string> path = new List<string>();
            if (removeScreenShots?.Length > 0)
            {
                IEnumerable<tbl_proj_screenshots> list = db.tbl_proj_screenshots.Where(w => removeScreenShots.Contains(w.ssId)).ToList();
                foreach(tbl_proj_screenshots screenshot in list)
                {
                    path.Add(screenshot.path);
                }
                db.tbl_proj_screenshots.RemoveRange(list);
                db.SaveChanges();
                return path;
            }
            return path;
        }
    }
}