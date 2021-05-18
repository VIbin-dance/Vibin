import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { ImportPlaybackKeyPairRequest, ImportPlaybackKeyPairResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ImportPlaybackKeyPairCommandInput extends ImportPlaybackKeyPairRequest {
}
export interface ImportPlaybackKeyPairCommandOutput extends ImportPlaybackKeyPairResponse, __MetadataBearer {
}
/**
 * <p>Imports the public portion of a new key pair and returns its <code>arn</code> and
 *         <code>fingerprint</code>. The <code>privateKey</code> can then be used to generate viewer
 *       authorization tokens, to grant viewers access to private channels. For more information, see
 *         <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up
 *         Private Channels</a> in the <i>Amazon IVS User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ImportPlaybackKeyPairCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ImportPlaybackKeyPairCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ImportPlaybackKeyPairCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ImportPlaybackKeyPairCommandInput} for command's `input` shape.
 * @see {@link ImportPlaybackKeyPairCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ImportPlaybackKeyPairCommand extends $Command<ImportPlaybackKeyPairCommandInput, ImportPlaybackKeyPairCommandOutput, IvsClientResolvedConfig> {
    readonly input: ImportPlaybackKeyPairCommandInput;
    constructor(input: ImportPlaybackKeyPairCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ImportPlaybackKeyPairCommandInput, ImportPlaybackKeyPairCommandOutput>;
    private serialize;
    private deserialize;
}
