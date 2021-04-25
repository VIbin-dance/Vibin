import { ListTagsForResourceCommandInput, ListTagsForResourceCommandOutput } from "../commands/ListTagsForResourceCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListTagsForResource(config: IvsPaginationConfiguration, input: ListTagsForResourceCommandInput, ...additionalArguments: any): Paginator<ListTagsForResourceCommandOutput>;
