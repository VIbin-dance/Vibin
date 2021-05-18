import { __extends } from "tslib";
import { DeleteStreamKeyRequest } from "../models/models_0";
import { deserializeAws_restJson1DeleteStreamKeyCommand, serializeAws_restJson1DeleteStreamKeyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the stream key for the specified ARN, so it can no longer be used to
 *       stream.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeleteStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeleteStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeleteStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteStreamKeyCommandInput} for command's `input` shape.
 * @see {@link DeleteStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteStreamKeyCommand = /** @class */ (function (_super) {
    __extends(DeleteStreamKeyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteStreamKeyCommand(input) {
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
    DeleteStreamKeyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "DeleteStreamKeyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteStreamKeyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteStreamKeyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteStreamKeyCommand(input, context);
    };
    DeleteStreamKeyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteStreamKeyCommand(output, context);
    };
    return DeleteStreamKeyCommand;
}($Command));
export { DeleteStreamKeyCommand };
//# sourceMappingURL=DeleteStreamKeyCommand.js.map