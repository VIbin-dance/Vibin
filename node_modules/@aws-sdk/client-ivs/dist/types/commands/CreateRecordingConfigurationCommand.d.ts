import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { CreateRecordingConfigurationRequest, CreateRecordingConfigurationResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateRecordingConfigurationCommandInput extends CreateRecordingConfigurationRequest {
}
export interface CreateRecordingConfigurationCommandOutput extends CreateRecordingConfigurationResponse, __MetadataBearer {
}
/**
 * <p>Creates a new recording configuration, used to enable recording to Amazon S3.</p>
 *          <p>
 *             <b>Known issue:</b> In the us-east-1 region, if you use the AWS
 *       CLI to create a recording configuration, it returns success even if the S3 bucket is in a
 *       different region. In this case, the <code>state</code> of the recording configuration is
 *         <code>CREATE_FAILED</code> (instead of <code>ACTIVE</code>). (In other regions, the CLI
 *       correctly returns failure if the bucket is in a different region.)</p>
 *          <p>
 *             <b>Workaround:</b> Ensure that your S3 bucket is in the same region as the recording
 *       configuration. If you create a recording configuration in a different region as your S3
 *       bucket, delete that recording configuration and create a new one with an S3 bucket from the
 *       correct region.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, CreateRecordingConfigurationCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, CreateRecordingConfigurationCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new CreateRecordingConfigurationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateRecordingConfigurationCommandInput} for command's `input` shape.
 * @see {@link CreateRecordingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class CreateRecordingConfigurationCommand extends $Command<CreateRecordingConfigurationCommandInput, CreateRecordingConfigurationCommandOutput, IvsClientResolvedConfig> {
    readonly input: CreateRecordingConfigurationCommandInput;
    constructor(input: CreateRecordingConfigurationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateRecordingConfigurationCommandInput, CreateRecordingConfigurationCommandOutput>;
    private serialize;
    private deserialize;
}
