import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface AppConfig {
	appName: string;
	apiBase: string;
	perPage: string;
	consumerKey: string;
	consumerSecret: string;
	adminUsername: string;
	adminPassword: string;
	paypalSandbox: string;
	paypalProduction: string;
	payuSalt: string;
	payuKey: string;
}

export const BaseAppConfig: AppConfig = {
	appName: "TODOALMACEN.CL",
	apiBase: "http://todoalmacen.cl/wp-json/",
	perPage: "5",
	consumerKey: "ck_32fc047d4c021e74c4837256f495c537dfebd125",
	consumerSecret: "cs_9ec141e33d6dd66fc6c8511c0928157524e8d3cc",
	adminUsername: "admin",
	adminPassword: "qwertyuiop",
	paypalSandbox: "",
	paypalProduction: "https://www.flow.cl/api",
	payuSalt: "5C486FFD-CBD9-4406-B99C-1L2D94617D82",
	payuKey: "d9e1f4069d3d8a40fc92e03663848d3721893b35"
};