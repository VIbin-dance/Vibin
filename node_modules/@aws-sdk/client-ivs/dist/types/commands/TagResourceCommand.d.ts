import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { TagResourceRequest, TagResourceResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface TagResourceCommandInput extends TagResourceRequest {
}
export interface TagResourceCommandOutput extends TagResourceResponse, __MetadataBearer {
}
/**
 * <p>Adds or updates tags for the AWS resource with the specified ARN.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, TagResourceCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, TagResourceCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new TagResourceCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link TagResourceCommandInput} for command's `input` shape.
 * @see {@link TagResourceCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class TagResourceCommand extends $Command<TagResourceCommandInput, TagResourceCommandOutput, IvsClientResolvedConfig> {
    readonly input: TagResourceCommandInput;
    constructor(input: TagResourceCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TagResourceCommandInput, TagResourceCommandOutput>;
    private serialize;
    private deserialize;
}
