import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { ListRecordingConfigurationsRequest, ListRecordingConfigurationsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListRecordingConfigurationsCommandInput extends ListRecordingConfigurationsRequest {
}
export interface ListRecordingConfigurationsCommandOutput extends ListRecordingConfigurationsResponse, __MetadataBearer {
}
/**
 * <p>Gets summary information about all recording configurations in your account, in the AWS
 *       region where the API request is processed.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListRecordingConfigurationsCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListRecordingConfigurationsCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListRecordingConfigurationsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListRecordingConfigurationsCommandInput} for command's `input` shape.
 * @see {@link ListRecordingConfigurationsCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ListRecordingConfigurationsCommand extends $Command<ListRecordingConfigurationsCommandInput, ListRecordingConfigurationsCommandOutput, IvsClientResolvedConfig> {
    readonly input: ListRecordingConfigurationsCommandInput;
    constructor(input: ListRecordingConfigurationsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListRecordingConfigurationsCommandInput, ListRecordingConfigurationsCommandOutput>;
    private serialize;
    private deserialize;
}
