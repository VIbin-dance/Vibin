import { ListStreamsCommandInput, ListStreamsCommandOutput } from "../commands/ListStreamsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListStreams(config: IvsPaginationConfiguration, input: ListStreamsCommandInput, ...additionalArguments: any): Paginator<ListStreamsCommandOutput>;
