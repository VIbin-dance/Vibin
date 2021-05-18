import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { GetPlaybackKeyPairRequest, GetPlaybackKeyPairResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetPlaybackKeyPairCommandInput extends GetPlaybackKeyPairRequest {
}
export interface GetPlaybackKeyPairCommandOutput extends GetPlaybackKeyPairResponse, __MetadataBearer {
}
/**
 * <p>Gets a specified playback authorization key pair and returns the <code>arn</code> and
 *         <code>fingerprint</code>. The <code>privateKey</code> held by the caller can be used to
 *       generate viewer authorization tokens, to grant viewers access to private channels. For more
 *       information, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up Private Channels</a> in the <i>Amazon IVS User
 *       Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetPlaybackKeyPairCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetPlaybackKeyPairCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetPlaybackKeyPairCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetPlaybackKeyPairCommandInput} for command's `input` shape.
 * @see {@link GetPlaybackKeyPairCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class GetPlaybackKeyPairCommand extends $Command<GetPlaybackKeyPairCommandInput, GetPlaybackKeyPairCommandOutput, IvsClientResolvedConfig> {
    readonly input: GetPlaybackKeyPairCommandInput;
    constructor(input: GetPlaybackKeyPairCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetPlaybackKeyPairCommandInput, GetPlaybackKeyPairCommandOutput>;
    private serialize;
    private deserialize;
}
