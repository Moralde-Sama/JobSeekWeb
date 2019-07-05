﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JobSeekWeb.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class JobEntities : DbContext
    {
        public JobEntities()
            : base("name=JobEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<tbl_asp_role> tbl_asp_role { get; set; }
        public virtual DbSet<tbl_asp_user_claim> tbl_asp_user_claim { get; set; }
        public virtual DbSet<tbl_asp_user_login> tbl_asp_user_login { get; set; }
        public virtual DbSet<tbl_asp_users> tbl_asp_users { get; set; }
        public virtual DbSet<tbl_category> tbl_category { get; set; }
        public virtual DbSet<tbl_chat> tbl_chat { get; set; }
        public virtual DbSet<tbl_chat_attachment> tbl_chat_attachment { get; set; }
        public virtual DbSet<tbl_company> tbl_company { get; set; }
        public virtual DbSet<tbl_company_job> tbl_company_job { get; set; }
        public virtual DbSet<tbl_notification> tbl_notification { get; set; }
        public virtual DbSet<tbl_pproject_skill> tbl_pproject_skill { get; set; }
        public virtual DbSet<tbl_proj_screenshots> tbl_proj_screenshots { get; set; }
        public virtual DbSet<tbl_project> tbl_project { get; set; }
        public virtual DbSet<tbl_project_participants> tbl_project_participants { get; set; }
        public virtual DbSet<tbl_requirements> tbl_requirements { get; set; }
        public virtual DbSet<tbl_worker> tbl_worker { get; set; }
        public virtual DbSet<tbl_worker_skill> tbl_worker_skill { get; set; }
        public virtual DbSet<tbl_personal_project> tbl_personal_project { get; set; }
        public virtual DbSet<tbl_skill> tbl_skill { get; set; }
    
        public virtual ObjectResult<Nullable<int>> spWorker_Exist(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("spWorker_Exist", asp_userIdParameter);
        }
    
        public virtual ObjectResult<spWorker_getDetails_Result> spWorker_getDetails(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spWorker_getDetails_Result>("spWorker_getDetails", asp_userIdParameter);
        }
    
        public virtual ObjectResult<Nullable<int>> spCompany_getCompanyId(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("spCompany_getCompanyId", asp_userIdParameter);
        }
    
        public virtual ObjectResult<Nullable<int>> spWorker_getWorkerId(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("spWorker_getWorkerId", asp_userIdParameter);
        }
    
        public virtual int spWorker_updateDetails(Nullable<int> workerId, string fname, string mname, string lname, Nullable<System.DateTime> birthdate, string gender, string header, string cellnum, Nullable<int> region, Nullable<int> province, Nullable<int> city, Nullable<int> brgy)
        {
            var workerIdParameter = workerId.HasValue ?
                new ObjectParameter("workerId", workerId) :
                new ObjectParameter("workerId", typeof(int));
    
            var fnameParameter = fname != null ?
                new ObjectParameter("fname", fname) :
                new ObjectParameter("fname", typeof(string));
    
            var mnameParameter = mname != null ?
                new ObjectParameter("mname", mname) :
                new ObjectParameter("mname", typeof(string));
    
            var lnameParameter = lname != null ?
                new ObjectParameter("lname", lname) :
                new ObjectParameter("lname", typeof(string));
    
            var birthdateParameter = birthdate.HasValue ?
                new ObjectParameter("birthdate", birthdate) :
                new ObjectParameter("birthdate", typeof(System.DateTime));
    
            var genderParameter = gender != null ?
                new ObjectParameter("gender", gender) :
                new ObjectParameter("gender", typeof(string));
    
            var headerParameter = header != null ?
                new ObjectParameter("header", header) :
                new ObjectParameter("header", typeof(string));
    
            var cellnumParameter = cellnum != null ?
                new ObjectParameter("cellnum", cellnum) :
                new ObjectParameter("cellnum", typeof(string));
    
            var regionParameter = region.HasValue ?
                new ObjectParameter("region", region) :
                new ObjectParameter("region", typeof(int));
    
            var provinceParameter = province.HasValue ?
                new ObjectParameter("province", province) :
                new ObjectParameter("province", typeof(int));
    
            var cityParameter = city.HasValue ?
                new ObjectParameter("city", city) :
                new ObjectParameter("city", typeof(int));
    
            var brgyParameter = brgy.HasValue ?
                new ObjectParameter("brgy", brgy) :
                new ObjectParameter("brgy", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_updateDetails", workerIdParameter, fnameParameter, mnameParameter, lnameParameter, birthdateParameter, genderParameter, headerParameter, cellnumParameter, regionParameter, provinceParameter, cityParameter, brgyParameter);
        }
    
        public virtual int spSkill_addSkill(string title, Nullable<int> categoryId)
        {
            var titleParameter = title != null ?
                new ObjectParameter("title", title) :
                new ObjectParameter("title", typeof(string));
    
            var categoryIdParameter = categoryId.HasValue ?
                new ObjectParameter("categoryId", categoryId) :
                new ObjectParameter("categoryId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spSkill_addSkill", titleParameter, categoryIdParameter);
        }
    
        public virtual int spWorker_addSkill(Nullable<int> workerId, Nullable<int> skillId)
        {
            var workerIdParameter = workerId.HasValue ?
                new ObjectParameter("workerId", workerId) :
                new ObjectParameter("workerId", typeof(int));
    
            var skillIdParameter = skillId.HasValue ?
                new ObjectParameter("skillId", skillId) :
                new ObjectParameter("skillId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_addSkill", workerIdParameter, skillIdParameter);
        }
    
        public virtual ObjectResult<spSkill_getSkillDetailsById_Result> spSkill_getSkillDetailsById(Nullable<int> skillId)
        {
            var skillIdParameter = skillId.HasValue ?
                new ObjectParameter("skillId", skillId) :
                new ObjectParameter("skillId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spSkill_getSkillDetailsById_Result>("spSkill_getSkillDetailsById", skillIdParameter);
        }
    
        public virtual ObjectResult<spSkill_getSkillDetailsByTitle_Result> spSkill_getSkillDetailsByTitle(string title)
        {
            var titleParameter = title != null ?
                new ObjectParameter("title", title) :
                new ObjectParameter("title", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spSkill_getSkillDetailsByTitle_Result>("spSkill_getSkillDetailsByTitle", titleParameter);
        }
    
        public virtual ObjectResult<string> spWorker_GetFullName(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("spWorker_GetFullName", asp_userIdParameter);
        }
    
        public virtual ObjectResult<spWorker_getWorkerSkills_Result> spWorker_getWorkerSkills(Nullable<int> workerId)
        {
            var workerIdParameter = workerId.HasValue ?
                new ObjectParameter("workerId", workerId) :
                new ObjectParameter("workerId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spWorker_getWorkerSkills_Result>("spWorker_getWorkerSkills", workerIdParameter);
        }
    
        public virtual ObjectResult<Nullable<int>> spCompany_Exist(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("spCompany_Exist", asp_userIdParameter);
        }
    
        public virtual int spWorker_updatePersonalInfo(Nullable<int> workerId, string fname, string mname, string lname, string gender, string cellnum, Nullable<System.DateTime> birthdate, string header)
        {
            var workerIdParameter = workerId.HasValue ?
                new ObjectParameter("workerId", workerId) :
                new ObjectParameter("workerId", typeof(int));
    
            var fnameParameter = fname != null ?
                new ObjectParameter("fname", fname) :
                new ObjectParameter("fname", typeof(string));
    
            var mnameParameter = mname != null ?
                new ObjectParameter("mname", mname) :
                new ObjectParameter("mname", typeof(string));
    
            var lnameParameter = lname != null ?
                new ObjectParameter("lname", lname) :
                new ObjectParameter("lname", typeof(string));
    
            var genderParameter = gender != null ?
                new ObjectParameter("gender", gender) :
                new ObjectParameter("gender", typeof(string));
    
            var cellnumParameter = cellnum != null ?
                new ObjectParameter("cellnum", cellnum) :
                new ObjectParameter("cellnum", typeof(string));
    
            var birthdateParameter = birthdate.HasValue ?
                new ObjectParameter("birthdate", birthdate) :
                new ObjectParameter("birthdate", typeof(System.DateTime));
    
            var headerParameter = header != null ?
                new ObjectParameter("header", header) :
                new ObjectParameter("header", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_updatePersonalInfo", workerIdParameter, fnameParameter, mnameParameter, lnameParameter, genderParameter, cellnumParameter, birthdateParameter, headerParameter);
        }
    
        public virtual int spWorker_updateAddress(Nullable<int> asp_userId, Nullable<int> region, Nullable<int> province, Nullable<int> city, Nullable<int> brgy)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            var regionParameter = region.HasValue ?
                new ObjectParameter("region", region) :
                new ObjectParameter("region", typeof(int));
    
            var provinceParameter = province.HasValue ?
                new ObjectParameter("province", province) :
                new ObjectParameter("province", typeof(int));
    
            var cityParameter = city.HasValue ?
                new ObjectParameter("city", city) :
                new ObjectParameter("city", typeof(int));
    
            var brgyParameter = brgy.HasValue ?
                new ObjectParameter("brgy", brgy) :
                new ObjectParameter("brgy", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_updateAddress", asp_userIdParameter, regionParameter, provinceParameter, cityParameter, brgyParameter);
        }
    
        public virtual ObjectResult<spCategories_getAll_Result2> spCategories_getAll()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spCategories_getAll_Result2>("spCategories_getAll");
        }
    
        public virtual ObjectResult<spSkills_getAll_Result> spSkills_getAll()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spSkills_getAll_Result>("spSkills_getAll");
        }
    
        public virtual int spWorker_deleteSkill(Nullable<int> workerSkillId)
        {
            var workerSkillIdParameter = workerSkillId.HasValue ?
                new ObjectParameter("workerSkillId", workerSkillId) :
                new ObjectParameter("workerSkillId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_deleteSkill", workerSkillIdParameter);
        }
    
        public virtual int spWorker_updateProfilePic(Nullable<int> asp_userId, string profpath)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            var profpathParameter = profpath != null ?
                new ObjectParameter("profpath", profpath) :
                new ObjectParameter("profpath", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_updateProfilePic", asp_userIdParameter, profpathParameter);
        }
    
        public virtual int spWorker_updateCoverPhoto(Nullable<int> asp_userId, string coverpath)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            var coverpathParameter = coverpath != null ?
                new ObjectParameter("coverpath", coverpath) :
                new ObjectParameter("coverpath", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spWorker_updateCoverPhoto", asp_userIdParameter, coverpathParameter);
        }
    
        public virtual ObjectResult<spWorker_getAllUserInfo_Result> spWorker_getAllUserInfo(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spWorker_getAllUserInfo_Result>("spWorker_getAllUserInfo", asp_userIdParameter);
        }
    
        public virtual ObjectResult<spProject_getAllPersonalProj_Result> spProject_getAllPersonalProj(Nullable<int> ownerId)
        {
            var ownerIdParameter = ownerId.HasValue ?
                new ObjectParameter("ownerId", ownerId) :
                new ObjectParameter("ownerId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spProject_getAllPersonalProj_Result>("spProject_getAllPersonalProj", ownerIdParameter);
        }
    
        public virtual ObjectResult<spProject_getScreenShots_Result> spProject_getScreenShots(Nullable<int> projId, Nullable<int> isPersonal)
        {
            var projIdParameter = projId.HasValue ?
                new ObjectParameter("projId", projId) :
                new ObjectParameter("projId", typeof(int));
    
            var isPersonalParameter = isPersonal.HasValue ?
                new ObjectParameter("isPersonal", isPersonal) :
                new ObjectParameter("isPersonal", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spProject_getScreenShots_Result>("spProject_getScreenShots", projIdParameter, isPersonalParameter);
        }
    
        public virtual ObjectResult<spProject_getSkills_Result> spProject_getSkills(Nullable<int> projId)
        {
            var projIdParameter = projId.HasValue ?
                new ObjectParameter("projId", projId) :
                new ObjectParameter("projId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spProject_getSkills_Result>("spProject_getSkills", projIdParameter);
        }
    
        public virtual int spProject_deleteSkill(Nullable<int> pprojectskillId)
        {
            var pprojectskillIdParameter = pprojectskillId.HasValue ?
                new ObjectParameter("pprojectskillId", pprojectskillId) :
                new ObjectParameter("pprojectskillId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spProject_deleteSkill", pprojectskillIdParameter);
        }
    }
}
