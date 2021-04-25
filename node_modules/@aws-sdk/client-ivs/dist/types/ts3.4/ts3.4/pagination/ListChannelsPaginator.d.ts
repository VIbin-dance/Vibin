import { ListChannelsCommandInput, ListChannelsCommandOutput } from "../commands/ListChannelsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListChannels(config: IvsPaginationConfiguration, input: ListChannelsCommandInput, ...additionalArguments: any): Paginator<ListChannelsCommandOutput>;
