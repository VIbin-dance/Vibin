import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { GetChannelRequest, GetChannelResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetChannelCommandInput extends GetChannelRequest {
}
export interface GetChannelCommandOutput extends GetChannelResponse, __MetadataBearer {
}
/**
 * <p>Gets the channel configuration for the specified channel ARN. See also <a>BatchGetChannel</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetChannelCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetChannelCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetChannelCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetChannelCommandInput} for command's `input` shape.
 * @see {@link GetChannelCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class GetChannelCommand extends $Command<GetChannelCommandInput, GetChannelCommandOutput, IvsClientResolvedConfig> {
    readonly input: GetChannelCommandInput;
    constructor(input: GetChannelCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetChannelCommandInput, GetChannelCommandOutput>;
    private serialize;
    private deserialize;
}
