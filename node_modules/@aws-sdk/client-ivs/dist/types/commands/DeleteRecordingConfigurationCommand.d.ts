import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { DeleteRecordingConfigurationRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeleteRecordingConfigurationCommandInput extends DeleteRecordingConfigurationRequest {
}
export interface DeleteRecordingConfigurationCommandOutput extends __MetadataBearer {
}
/**
 * <p>Deletes the recording configuration for the specified ARN.</p>
 *          <p>If you try to delete a recording configuration that is associated with a channel, you will
 *       get an error (409 ConflictException). To avoid this, for all channels that reference the
 *       recording configuration, first use <a>UpdateChannel</a> to set the
 *         <code>recordingConfigurationArn</code> field to an empty string, then use
 *       DeleteRecordingConfiguration.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeleteRecordingConfigurationCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeleteRecordingConfigurationCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeleteRecordingConfigurationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteRecordingConfigurationCommandInput} for command's `input` shape.
 * @see {@link DeleteRecordingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class DeleteRecordingConfigurationCommand extends $Command<DeleteRecordingConfigurationCommandInput, DeleteRecordingConfigurationCommandOutput, IvsClientResolvedConfig> {
    readonly input: DeleteRecordingConfigurationCommandInput;
    constructor(input: DeleteRecordingConfigurationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteRecordingConfigurationCommandInput, DeleteRecordingConfigurationCommandOutput>;
    private serialize;
    private deserialize;
}
