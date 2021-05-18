import { __extends } from "tslib";
import { TagResourceRequest, TagResourceResponse } from "../models/models_0";
import { deserializeAws_restJson1TagResourceCommand, serializeAws_restJson1TagResourceCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var TagResourceCommand = /** @class */ (function (_super) {
    __extends(TagResourceCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function TagResourceCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    TagResourceCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "TagResourceCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TagResourceRequest.filterSensitiveLog,
            outputFilterSensitiveLog: TagResourceResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TagResourceCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1TagResourceCommand(input, context);
    };
    TagResourceCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1TagResourceCommand(output, context);
    };
    return TagResourceCommand;
}($Command));
export { TagResourceCommand };
//# sourceMappingURL=TagResourceCommand.js.map