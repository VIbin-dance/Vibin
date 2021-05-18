import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { PutMetadataRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface PutMetadataCommandInput extends PutMetadataRequest {
}
export interface PutMetadataCommandOutput extends __MetadataBearer {
}
/**
 * <p>Inserts metadata into the active stream of the specified channel. A maximum of 5 requests
 *       per second per channel is allowed, each with a maximum 1 KB payload. (If 5 TPS is not
 *       sufficient for your needs, we recommend batching your data into a single PutMetadata call.)
 *
 *       Also see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/metadata.html">Embedding Metadata
 *
 *         within a Video Stream</a> in the <i>Amazon IVS User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, PutMetadataCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, PutMetadataCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new PutMetadataCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutMetadataCommandInput} for command's `input` shape.
 * @see {@link PutMetadataCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class PutMetadataCommand extends $Command<PutMetadataCommandInput, PutMetadataCommandOutput, IvsClientResolvedConfig> {
    readonly input: PutMetadataCommandInput;
    constructor(input: PutMetadataCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutMetadataCommandInput, PutMetadataCommandOutput>;
    private serialize;
    private deserialize;
}
