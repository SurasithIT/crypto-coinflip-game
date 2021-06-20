import { environment } from "src/environments/environment";

export class AppSettings {
    // public static envName = "Staging"; // Environment changed, changes this
    public static envName = environment.name; // Environment changed, changes this

    private static Env = {
        Development: {
            envName: "Development",
            host: "http://localhost:5003",
            appVersion: "1.0"
        },
        Testing: {
            envName: "Testing",
            host: "http://localhost/facebot-api",
            appVersion: "1.0"
        },
        Staging: {
            envName: "Staging",
            host: "http://103.74.252.183/facebot-api",
            appVersion: "1.0"
        },
        Production: {
            envName: "Production",
            host: "http://103.74.254.227/facebot-api",
            appVersion: "1.0"
        }
    };

    public static appBuildNo = "2021061901";
    public static CONTRACT_ADDRESS = "0x7856f9cC839854A717c699ec8C83550fA6d6603C"

}