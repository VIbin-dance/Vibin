import { ListRecordingConfigurationsCommandInput, ListRecordingConfigurationsCommandOutput } from "../commands/ListRecordingConfigurationsCommand";
import { IvsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListRecordingConfigurations(config: IvsPaginationConfiguration, input: ListRecordingConfigurationsCommandInput, ...additionalArguments: any): Paginator<ListRecordingConfigurationsCommandOutput>;
