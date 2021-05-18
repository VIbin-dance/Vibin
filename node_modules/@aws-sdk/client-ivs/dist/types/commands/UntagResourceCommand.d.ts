import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { UntagResourceRequest, UntagResourceResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UntagResourceCommandInput extends UntagResourceRequest {
}
export interface UntagResourceCommandOutput extends UntagResourceResponse, __MetadataBearer {
}
/**
 * <p>Removes tags from the resource with the specified ARN.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, UntagResourceCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, UntagResourceCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new UntagResourceCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UntagResourceCommandInput} for command's `input` shape.
 * @see {@link UntagResourceCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class UntagResourceCommand extends $Command<UntagResourceCommandInput, UntagResourceCommandOutput, IvsClientResolvedConfig> {
    readonly input: UntagResourceCommandInput;
    constructor(input: UntagResourceCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UntagResourceCommandInput, UntagResourceCommandOutput>;
    private serialize;
    private deserialize;
}
