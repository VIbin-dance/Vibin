import { __extends } from "tslib";
import { CreateStreamKeyRequest, CreateStreamKeyResponse } from "../models/models_0";
import { deserializeAws_restJson1CreateStreamKeyCommand, serializeAws_restJson1CreateStreamKeyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a stream key, used to initiate a stream, for the specified channel ARN.</p>
 *          <p>Note that <a>CreateChannel</a> creates a stream key. If you subsequently use
 *       CreateStreamKey on the same channel, it will fail because a stream key already exists and
 *       there is a limit of 1 stream key per channel. To reset the stream key on a channel, use <a>DeleteStreamKey</a> and then CreateStreamKey.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, CreateStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, CreateStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new CreateStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateStreamKeyCommandInput} for command's `input` shape.
 * @see {@link CreateStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateStreamKeyCommand = /** @class */ (function (_super) {
    __extends(CreateStreamKeyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateStreamKeyCommand(input) {
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
    CreateStreamKeyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "CreateStreamKeyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateStreamKeyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateStreamKeyResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateStreamKeyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateStreamKeyCommand(input, context);
    };
    CreateStreamKeyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateStreamKeyCommand(output, context);
    };
    return CreateStreamKeyCommand;
}($Command));
export { CreateStreamKeyCommand };
//# sourceMappingURL=CreateStreamKeyCommand.js.map