import { environment } from "src/environments/environment";
const contractJSON = require("./services/truffle/build/contracts/KOSCoinflip.json");

export class AppSettings {
    // public static envName = "Staging"; // Environment changed, changes this
    public static envName = environment.name; // Environment changed, changes this

    public static CONTRACT_ADDRESS = contractJSON.networks["5777"].address
    public static appBuildNo = "2021061901";

}