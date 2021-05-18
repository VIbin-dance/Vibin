import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { GetRecordingConfigurationRequest, GetRecordingConfigurationResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetRecordingConfigurationCommandInput extends GetRecordingConfigurationRequest {
}
export interface GetRecordingConfigurationCommandOutput extends GetRecordingConfigurationResponse, __MetadataBearer {
}
/**
 * <p>Gets the recording configuration for the specified ARN.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetRecordingConfigurationCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetRecordingConfigurationCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetRecordingConfigurationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetRecordingConfigurationCommandInput} for command's `input` shape.
 * @see {@link GetRecordingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class GetRecordingConfigurationCommand extends $Command<GetRecordingConfigurationCommandInput, GetRecordingConfigurationCommandOutput, IvsClientResolvedConfig> {
    readonly input: GetRecordingConfigurationCommandInput;
    constructor(input: GetRecordingConfigurationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetRecordingConfigurationCommandInput, GetRecordingConfigurationCommandOutput>;
    private serialize;
    private deserialize;
}
