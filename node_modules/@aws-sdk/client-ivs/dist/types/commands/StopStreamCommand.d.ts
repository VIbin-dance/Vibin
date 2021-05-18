import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { StopStreamRequest, StopStreamResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface StopStreamCommandInput extends StopStreamRequest {
}
export interface StopStreamCommandOutput extends StopStreamResponse, __MetadataBearer {
}
/**
 * <p>Disconnects the incoming RTMPS stream for the specified channel. Can be used in
 *       conjunction with <a>DeleteStreamKey</a> to prevent further streaming to a
 *       channel.</p>
 *          <note>
 *             <p>Many streaming client-software libraries automatically reconnect a dropped RTMPS
 *         session, so to stop the stream permanently, you may want to first revoke the
 *           <code>streamKey</code> attached to the channel.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, StopStreamCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, StopStreamCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new StopStreamCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link StopStreamCommandInput} for command's `input` shape.
 * @see {@link StopStreamCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class StopStreamCommand extends $Command<StopStreamCommandInput, StopStreamCommandOutput, IvsClientResolvedConfig> {
    readonly input: StopStreamCommandInput;
    constructor(input: StopStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopStreamCommandInput, StopStreamCommandOutput>;
    private serialize;
    private deserialize;
}
