import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { CreateStreamKeyRequest, CreateStreamKeyResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateStreamKeyCommandInput extends CreateStreamKeyRequest {
}
export interface CreateStreamKeyCommandOutput extends CreateStreamKeyResponse, __MetadataBearer {
}
/**
 * <p>Creates a stream key, used to initiate a stream, for the specified channel ARN.</p>
 *          <p>Note that <a>CreateChannel</a> creates a stream key. If you subsequently use
 *       CreateStreamKey on the same channel, it will fail because a stream key already exists and
 *       there is a limit of 1 stream key per channel. To reset the stream key on a channel, use <a>DeleteStreamKey</a> and then CreateStreamKey.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, CreateStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, CreateStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new CreateStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateStreamKeyCommandInput} for command's `input` shape.
 * @see {@link CreateStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class CreateStreamKeyCommand extends $Command<CreateStreamKeyCommandInput, CreateStreamKeyCommandOutput, IvsClientResolvedConfig> {
    readonly input: CreateStreamKeyCommandInput;
    constructor(input: CreateStreamKeyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateStreamKeyCommandInput, CreateStreamKeyCommandOutput>;
    private serialize;
    private deserialize;
}
