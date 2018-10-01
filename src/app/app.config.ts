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
	appName: "MOBIMALL",
	apiBase: "https://todoalmacen.cl/wp-json/",
	perPage: "5",
	consumerKey: "ck_32fc047d4c021e74c4837256f495c537dfebd125",
	consumerSecret: "cs_9ec141e33d6dd66fc6c8511c0928157524e8d3cc",
	adminUsername: "admin",
	adminPassword: "qwertyuiop",
	paypalSandbox: "",
	paypalProduction: "",
	payuSalt: "",
	payuKey: ""
};