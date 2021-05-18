"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchGetStreamKeyCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Performs <a>GetStreamKey</a> on multiple ARNs simultaneously.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, BatchGetStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, BatchGetStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new BatchGetStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link BatchGetStreamKeyCommandInput} for command's `input` shape.
 * @see {@link BatchGetStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
class BatchGetStreamKeyCommand extends smithy_client_1.Command {
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
        const commandName = "BatchGetStreamKeyCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.BatchGetStreamKeyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.BatchGetStreamKeyResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1BatchGetStreamKeyCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1BatchGetStreamKeyCommand(output, context);
    }
}
exports.BatchGetStreamKeyCommand = BatchGetStreamKeyCommand;
//# sourceMappingURL=BatchGetStreamKeyCommand.js.map