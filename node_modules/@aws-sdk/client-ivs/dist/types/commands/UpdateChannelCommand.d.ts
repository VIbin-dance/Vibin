import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { UpdateChannelRequest, UpdateChannelResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UpdateChannelCommandInput extends UpdateChannelRequest {
}
export interface UpdateChannelCommandOutput extends UpdateChannelResponse, __MetadataBearer {
}
/**
 * <p>Updates a channel's configuration. This does not affect an ongoing stream of this channel.
 *       You must stop and restart the stream for the changes to take effect.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, UpdateChannelCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, UpdateChannelCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new UpdateChannelCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateChannelCommandInput} for command's `input` shape.
 * @see {@link UpdateChannelCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class UpdateChannelCommand extends $Command<UpdateChannelCommandInput, UpdateChannelCommandOutput, IvsClientResolvedConfig> {
    readonly input: UpdateChannelCommandInput;
    constructor(input: UpdateChannelCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateChannelCommandInput, UpdateChannelCommandOutput>;
    private serialize;
    private deserialize;
}
