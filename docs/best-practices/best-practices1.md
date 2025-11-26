---
sidebar_position: 1
---

# Case Study 1 – Code Review

### Using CoStrict for Code Review and Root-Cause Analysis: 3 Days of Work Done in 2 Hours

A product R&D team used the AI-assisted coding tool CoStrict to track down a handle-leak bug in the multi-platform collector Pagent. What used to be a 2–3-day manual code review was compressed into a 2-hour session. CoStrict inspected every related handle operation without missing a single potential risk and accurately pinpointed the most serious process-handle mismanagement—details that human reviews often overlook.

#### 1. Background

Pagent is a cross-platform system-monitoring agent that collects CPU, memory, process, and thread data and reports it to the iom platform. Recently, a severe handle-leak was observed on Windows: the process’s handle count kept climbing the longer it ran, eventually degrading system performance and stability.

Traditional troubleshooting required engineers to slog through thousands of lines, manually tracing Windows-API calls such as `windows.CloseHandle`. It was slow, labor-intensive, and error-prone. We decided to let an AI assistant do the heavy lifting.

#### 2. Step-by-Step

**Step 1 – Give the AI context**  
I opened with a concise problem statement:

```
This is a multi-platform collector called pagent. It gathers cpu, memory, process, and thread metrics and uploads them to the iom platform. On Windows the process leaks handles badly. Help me analyze the code and find where handles might be left open.
```

**Step 2 – Let the AI explore the repo**  
I asked it to list the top-level structure:

```
<list_files> <path>.</path> <recursive>false</recursive> </list_files>
```

**Step 3 – Drill down into Windows-specific modules**  
I then guided it layer by layer:

1. Read the main entry point to understand Windows init/cleanup.  
2. Examine the Windows collector core.  
3. Focus on DLL load/unload code.  
4. Deep-dive into process-info collection.  
5. Check performance-counter handle lifetimes.

**Step 4 – Refocus when necessary**  
When the AI started chasing panic paths, I steered it back:

```
Concentrate on places where windows.CloseHandle is missing; panic scenarios are edge cases we can ignore for now.
```

**Step 5 – Zoom in on the exact handle patterns**  
I told it to watch for:

- `windows.OpenProcess` vs. `windows.CloseHandle` pairing  
- PDH query handle create/destroy  
- Process-snapshot handle lifetime  
- Event and registry handle hygiene  

#### 3. Results

**1. Comprehensive detection**  
The AI flagged six major leak categories:

- Process-snapshot leaks  
- Process-handle misuse (most critical)  
- PDH-query leaks (high risk)  
- Certificate-validation leaks  
- Event-handle leaks  
- Registry-handle leaks  

**2. Pin-pointed locations**  
It cited exact files and line ranges:

- `agent/collector/windows/process.go:484-494` – process-handle logic  
- `agent/collector/windows/process.go:617-668` – PDH-query management  
- `common/utils/utils_windows.go:295-300` – event-handle cleanup  

**3. Actionable fixes**  
It produced ready-to-paste patches:

- Handle-validity checks before close  
- Safer `defer` ordering  
- Error-handling improvements  

**Gains vs. the old way**

- **Speed:** 2–3 days → 2 hours  
- **Coverage:** 100 % of handle sites inspected, nothing missed  
- **Accuracy:** Caught the worst process-handle bug that humans usually skip  

#### 4. Take-aways

This exercise convinced me that AI-assisted coding excels at review and root-cause analysis. It groks project structure, systematically walks the code, spots weak spots, and offers concrete fixes.

Keys to success:

- State the problem plainly.  
- Guide the AI from high-level to nitty-gritty.  
- Redirect its focus as soon as it drifts.  
- Keep it locked on concrete implementation details.

AI isn’t here to replace developers; it’s a power tool that chews through repetitive analysis so we can focus on design and architecture. Fold it into your daily workflow—you’ll wonder how you ever lived without it.
