---
sidebar_position: 2
---

# v2.0.0

## New Strict and Vibe Development Modes

This update introduces two distinct development modes to meet different development scenarios:

### Strict Mode (Enterprise Development Mode)

Strict Mode is a structured, systematic development approach that strictly follows enterprise development process standards. Through the "project reverse inference → requirement clarification → design → task breakdown → self-testing and self-repair" workflow, it helps AI accurately understand existing project dependencies, reuse established code standards, and improve AI delivery quality through standardized processes to generate more usable code.

**Applicable Scenarios**: Recommended for complex tasks such as "adding new features to existing code."

### Vibe Mode

Vibe Mode continues the previous development approach where requirement clarification and code generation alternate, suitable for rapid development or simple task scenarios. Users with strong prompt engineering skills can still produce high-quality code through Vibe Mode.

## Built-in Intelligent Tools for Enhanced Generation

CoStrict includes multiple intelligent tools to enhance generation effects, available in both Strict and Vibe modes:

### Project Understanding

The large model generates a project knowledge base and rules "optimized for AI reading," helping AI understand the business and improve code generation accuracy.

### Test Planning

Analyzes and generates project test plans to improve code quality and reliability.

### Problem Troubleshooting

Input problem logs or failure descriptions, and AI assists in locating root causes and providing repair solutions.

## Support for Intelligent Collaboration Workflow

Strict Mode supports visualization and editing of the task process, making development more efficient and controllable:

### Task Process Visualization and Editing

During execution, corresponding documents can be edited to collaborate with AI and adjust development direction in real-time.

### Automatic Process Synchronization

Following the "requirement clarification → design → task breakdown → self-testing and self-repair" process, when updating requirement documents, they can be synchronized to the design and implementation stages with one click.

### Independent Sub-task Execution

Each sub-task decomposed from requirements can be executed and tested independently, making the overall process more efficient and controllable.

## Important Notes

1. Due to high token consumption in Strict Mode, please ensure you have sufficient model tokens before use.
2. To ensure generation quality, it is recommended to use GLM4.5 or GLM4.6 models.
