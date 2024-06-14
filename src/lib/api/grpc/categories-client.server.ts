import { credentials } from "@grpc/grpc-js";
import { QueryCategoriesClient } from "./proto/category";

export default new QueryCategoriesClient(
	"0.0.0.0:3000",
	credentials.createInsecure(),
);
