import { ListStreamKeysCommandInput, ListStreamKeysCommandOutput } from "../commands/ListStreamKeysCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListStreamKeys(config: IvsPaginationConfiguration, input: ListStreamKeysCommandInput, ...additionalArguments: any): Paginator<ListStreamKeysCommandOutput>;
