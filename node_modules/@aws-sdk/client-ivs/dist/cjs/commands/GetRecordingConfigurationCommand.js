"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecordingConfigurationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the recording configuration for the specified ARN.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetRecordingConfigurationCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetRecordingConfigurationCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetRecordingConfigurationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetRecordingConfigurationCommandInput} for command's `input` shape.
 * @see {@link GetRecordingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
class GetRecordingConfigurationCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "IvsClient";
        const commandName = "GetRecordingConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetRecordingConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetRecordingConfigurationResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1GetRecordingConfigurationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1GetRecordingConfigurationCommand(output, context);
    }
}
exports.GetRecordingConfigurationCommand = GetRecordingConfigurationCommand;
//# sourceMappingURL=GetRecordingConfigurationCommand.js.map