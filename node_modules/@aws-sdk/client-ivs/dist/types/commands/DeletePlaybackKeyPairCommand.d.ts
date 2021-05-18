import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { DeletePlaybackKeyPairRequest, DeletePlaybackKeyPairResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeletePlaybackKeyPairCommandInput extends DeletePlaybackKeyPairRequest {
}
export interface DeletePlaybackKeyPairCommandOutput extends DeletePlaybackKeyPairResponse, __MetadataBearer {
}
/**
 * <p>Deletes a specified authorization key pair. This invalidates future viewer tokens
 *       generated using the key pair’s <code>privateKey</code>. For more information, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up Private
 *         Channels</a> in the <i>Amazon IVS User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeletePlaybackKeyPairCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeletePlaybackKeyPairCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeletePlaybackKeyPairCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeletePlaybackKeyPairCommandInput} for command's `input` shape.
 * @see {@link DeletePlaybackKeyPairCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class DeletePlaybackKeyPairCommand extends $Command<DeletePlaybackKeyPairCommandInput, DeletePlaybackKeyPairCommandOutput, IvsClientResolvedConfig> {
    readonly input: DeletePlaybackKeyPairCommandInput;
    constructor(input: DeletePlaybackKeyPairCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeletePlaybackKeyPairCommandInput, DeletePlaybackKeyPairCommandOutput>;
    private serialize;
    private deserialize;
}
