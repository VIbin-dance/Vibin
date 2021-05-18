import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { ListPlaybackKeyPairsRequest, ListPlaybackKeyPairsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListPlaybackKeyPairsCommandInput extends ListPlaybackKeyPairsRequest {
}
export interface ListPlaybackKeyPairsCommandOutput extends ListPlaybackKeyPairsResponse, __MetadataBearer {
}
/**
 * <p>Gets summary information about playback key pairs. For more information, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up Private
 *         Channels</a> in the <i>Amazon IVS User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListPlaybackKeyPairsCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListPlaybackKeyPairsCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListPlaybackKeyPairsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListPlaybackKeyPairsCommandInput} for command's `input` shape.
 * @see {@link ListPlaybackKeyPairsCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ListPlaybackKeyPairsCommand extends $Command<ListPlaybackKeyPairsCommandInput, ListPlaybackKeyPairsCommandOutput, IvsClientResolvedConfig> {
    readonly input: ListPlaybackKeyPairsCommandInput;
    constructor(input: ListPlaybackKeyPairsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListPlaybackKeyPairsCommandInput, ListPlaybackKeyPairsCommandOutput>;
    private serialize;
    private deserialize;
}
