import fs from "fs";

if (fs.existsSync("types/index.ts")) {
  import("./protocolRevenueShare");
}
