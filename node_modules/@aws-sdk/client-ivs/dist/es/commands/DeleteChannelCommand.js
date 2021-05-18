import { __extends } from "tslib";
import { DeleteChannelRequest } from "../models/models_0";
import { deserializeAws_restJson1DeleteChannelCommand, serializeAws_restJson1DeleteChannelCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified channel and its associated stream keys.</p>
 *          <p>If you try to delete a live channel, you will get an error (409 ConflictException). To
 *       delete a channel that is live, call <a>StopStream</a>, wait for the Amazon
 *       EventBridge "Stream End" event (to verify that the stream's state was changed from Live to
 *       Offline), then call DeleteChannel. (See <a href="https://docs.aws.amazon.com/ivs/latest/userguide/eventbridge.html"> Using EventBridge with Amazon IVS</a>.) </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeleteChannelCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeleteChannelCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeleteChannelCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteChannelCommandInput} for command's `input` shape.
 * @see {@link DeleteChannelCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteChannelCommand = /** @class */ (function (_super) {
    __extends(DeleteChannelCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteChannelCommand(input) {
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
    DeleteChannelCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "DeleteChannelCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteChannelRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteChannelCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteChannelCommand(input, context);
    };
    DeleteChannelCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteChannelCommand(output, context);
    };
    return DeleteChannelCommand;
}($Command));
export { DeleteChannelCommand };
//# sourceMappingURL=DeleteChannelCommand.js.map