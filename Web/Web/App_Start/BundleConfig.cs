using System;
using System.Web.Optimization;

namespace Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/scripts/underscore-min.js")
                .Include("~/scripts/jquery-{version}.js")
                .Include("~/scripts/knockout-{version}.debug.js")
                .Include("~/scripts/toastr.js")
                .Include("~/scripts/Q.js")
                .Include("~/scripts/breeze.debug.js")
                .Include("~/scripts/bootstrap.js")
                .Include("~/scripts/moment.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/fonts/font-awesome-4/css/font-awesome.min.css")

                .Include("~/Content/css/ie10mobile.css")
                .Include("~/Content/css/bootstrap.css")
                .Include("~/Content/css/bootstrap-responsive.css")

                .Include("~/Content/css/durandal.css")
                .Include("~/Content/css/toastr.css")

                .Include("~/script/bootstrap.switch/bootstrap-switch.css")
                .Include("~/script/jquery.nanoscroller/nanoscroller.css")

                //.Include("~/Content/css/app.css")
                .Include("~/Content/css/style.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");

            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}