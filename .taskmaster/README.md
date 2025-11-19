# TaskMaster AI - Project Task Management

This project has been initialized with TaskMaster AI, an AI-powered task management system.

## Quick Start

### 1. Customize Your PRD
Edit `.taskmaster/docs/prd.txt` with your project requirements:
- Project goals and objectives
- Features and requirements
- Technical specifications
- User stories

### 2. Generate Tasks
Once your PRD is ready, ask your AI assistant:
```
"Parse my PRD and generate tasks"
```

### 3. Start Working
Use natural language commands:
- "What's the next task I should work on?"
- "Help me implement task 3"
- "Show me all pending tasks"
- "Mark task 2 as completed"

## Directory Structure

```
.taskmaster/
├── docs/              # Project documentation
│   └── prd.txt        # Your Project Requirements Document
├── tasks/             # Individual task files
├── templates/         # Templates and examples
│   └── example_prd.txt
├── reports/           # Generated reports
├── config.json        # TaskMaster configuration
├── state.json         # Current project state
└── tasks.json         # Task definitions
```

## Configuration

The `.taskmaster/config.json` file contains:
- AI model configurations (main, research, fallback)
- Tool mode settings
- Project metadata

## Common Commands

Ask your AI assistant:
- "Parse my PRD at .taskmaster/docs/prd.txt"
- "Generate tasks from the PRD"
- "What's the next task?"
- "Help me implement task [number]"
- "Research [topic] for this project"
- "Show project status"

## API Keys

TaskMaster AI requires at least one API key from:
- Anthropic (Claude)
- OpenAI
- Google Gemini
- Perplexity
- xAI
- OpenRouter

Configure these in your editor's MCP settings or environment variables.

## Resources

- [TaskMaster AI Documentation](https://docs.task-master.dev)
- [GitHub Repository](https://github.com/eyaltoledano/claude-task-master)
- Template PRD: `.taskmaster/templates/example_prd.txt`

---

**Next Step:** Edit `.taskmaster/docs/prd.txt` with your project requirements!
