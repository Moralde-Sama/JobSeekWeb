//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class tbl_worker
    {
        public int workerId { get; set; }
        public string fname { get; set; }
        public string mname { get; set; }
        public string lname { get; set; }
        public Nullable<System.DateTime> birthdate { get; set; }
        public string gender { get; set; }
        public string header { get; set; }
        public string cellnum { get; set; }
        public Nullable<int> region { get; set; }
        public Nullable<int> province { get; set; }
        public Nullable<int> city { get; set; }
        public Nullable<int> brgy { get; set; }
        public int asp_user_Id { get; set; }
        public string prof_path { get; set; }
        public string cover_path { get; set; }
    }
}
