import { ListPlaybackKeyPairsCommandInput, ListPlaybackKeyPairsCommandOutput } from "../commands/ListPlaybackKeyPairsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListPlaybackKeyPairs(config: IvsPaginationConfiguration, input: ListPlaybackKeyPairsCommandInput, ...additionalArguments: any): Paginator<ListPlaybackKeyPairsCommandOutput>;
