"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRecordingConfigurationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes the recording configuration for the specified ARN.</p>
 *          <p>If you try to delete a recording configuration that is associated with a channel, you will
 *       get an error (409 ConflictException). To avoid this, for all channels that reference the
 *       recording configuration, first use <a>UpdateChannel</a> to set the
 *         <code>recordingConfigurationArn</code> field to an empty string, then use
 *       DeleteRecordingConfiguration.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeleteRecordingConfigurationCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeleteRecordingConfigurationCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeleteRecordingConfigurationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteRecordingConfigurationCommandInput} for command's `input` shape.
 * @see {@link DeleteRecordingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
class DeleteRecordingConfigurationCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteRecordingConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteRecordingConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1DeleteRecordingConfigurationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1DeleteRecordingConfigurationCommand(output, context);
    }
}
exports.DeleteRecordingConfigurationCommand = DeleteRecordingConfigurationCommand;
//# sourceMappingURL=DeleteRecordingConfigurationCommand.js.map