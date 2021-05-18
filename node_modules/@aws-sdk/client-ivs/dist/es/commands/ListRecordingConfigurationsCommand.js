import { __extends } from "tslib";
import { ListRecordingConfigurationsRequest, ListRecordingConfigurationsResponse } from "../models/models_0";
import { deserializeAws_restJson1ListRecordingConfigurationsCommand, serializeAws_restJson1ListRecordingConfigurationsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets summary information about all recording configurations in your account, in the AWS
 *       region where the API request is processed.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListRecordingConfigurationsCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListRecordingConfigurationsCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListRecordingConfigurationsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListRecordingConfigurationsCommandInput} for command's `input` shape.
 * @see {@link ListRecordingConfigurationsCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListRecordingConfigurationsCommand = /** @class */ (function (_super) {
    __extends(ListRecordingConfigurationsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListRecordingConfigurationsCommand(input) {
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
    ListRecordingConfigurationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "ListRecordingConfigurationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListRecordingConfigurationsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListRecordingConfigurationsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListRecordingConfigurationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListRecordingConfigurationsCommand(input, context);
    };
    ListRecordingConfigurationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListRecordingConfigurationsCommand(output, context);
    };
    return ListRecordingConfigurationsCommand;
}($Command));
export { ListRecordingConfigurationsCommand };
//# sourceMappingURL=ListRecordingConfigurationsCommand.js.map