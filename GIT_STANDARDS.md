# Git Standards & Workflow Guide

## 🚀 Repository Standards

### **Branch Structure**
```
Master (Production)
├── Backend-java-springboot-application (Backend Development)
├── Frontend-react-vite-application (Frontend Development)
└── new-feature-testing (New Features & Experiments)
```

### **Branch Naming Convention**
- **Master**: Production-ready code
- **Backend-java-springboot-application**: All backend-related changes
- **Frontend-react-vite-application**: All frontend-related changes
- **new-feature-testing**: New features, experiments, QA testing

## 📋 Git Workflow Standards

### **1. Before Making Changes**
```bash
# Always start with latest code
git checkout Master
git pull origin Master
git checkout <your-branch>
git merge Master
```

### **2. Making Changes**
```bash
# Work on your specific branch
# Backend changes → Backend-java-springboot-application
# Frontend changes → Frontend-react-vite-application
# New features → new-feature-testing
```

### **3. Commit Standards**
```bash
# Stage relevant files only
git add <relevant-files>

# Commit with descriptive message
git commit -m "type: brief description

Detailed explanation of changes:
- What was modified
- Why it was modified
- Any breaking changes
- Related issues (if any)"

# Commit types: feat, fix, docs, style, refactor, test, chore
```

### **4. Push Standards**
```bash
# Always push to your branch
git push origin <your-branch>

# NEVER push directly to Master
```

### **5. Merge to Master**
```bash
# Only merge when ready for production
git checkout Master
git pull origin Master
git merge <your-branch>
git push origin Master
```

## 🔄 File-to-Branch Mapping

### **Backend Files** → `Backend-java-springboot-application`
```
backend/
*.java
pom.xml
application.properties
*.sql (backend schemas)
```

### **Frontend Files** → `Frontend-react-vite-application`
```
components/
pages/
*.tsx
*.ts
*.jsx
*.js
package.json
*.css
*.scss
```

### **New Features** → `new-feature-testing`
```
qa/
experiments/
new modules
prototypes
```

### **Configuration/Docs** → `Master`
```
README.md
*.md
.gitignore
.github/
```

## ⚠️ Conflict Resolution Standards

### **1. Prevention**
```bash
# Always pull latest changes before starting
git checkout Master
git pull origin Master
git checkout <your-branch>
git merge Master
```

### **2. When Conflicts Occur**
```bash
# 1. Don't panic
# 2. Identify conflicting files
git status

# 3. Resolve conflicts manually
# 4. Stage resolved files
git add <conflicting-files>

# 5. Commit the resolution
git commit -m "resolve: merge conflicts in <affected-area>"

# 6. Test thoroughly
# 7. Push to your branch (NOT Master)
git push origin <your-branch>
```

## 📝 Commit Message Standards

### **Format**
```
type(scope): brief description

Detailed explanation (optional):
- Change 1
- Change 2

Related issues: #123 (optional)
```

### **Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting/Style
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

### **Examples**
```
feat(backend): add user authentication API

- Implemented JWT authentication
- Added user registration endpoint
- Created password validation
- Updated user model

fix(frontend): resolve navigation menu display issue

docs: update API documentation with new endpoints
refactor(backend): optimize database queries
test(qa): add automated form filling tests
```

## 🚨 Golden Rules

### **✅ DO**
- Always work on feature branches
- Pull latest Master before starting
- Write descriptive commit messages
- Test before merging to Master
- Resolve conflicts in your branch

### **❌ DON'T**
- Push directly to Master
- Commit unrelated changes together
- Use vague commit messages ("update", "fixes")
- Merge conflicts without testing
- Work on Master branch

## 🔄 Daily Workflow

### **Start of Day**
```bash
git checkout Master
git pull origin Master
git checkout <your-branch>
git merge Master
```

### **During Development**
```bash
# Make changes
git add <files>
git commit -m "type: description"
git push origin <your-branch>
```

### **End of Day**
```bash
# Commit all changes
git add -A
git commit -m "feat: daily progress - [summary]"
git push origin <your-branch>
```

## 🎯 Release Process

### **1. Feature Complete**
```bash
# Ensure all tests pass
# Update documentation
# Review changes
```

### **2. Merge to Master**
```bash
git checkout Master
git pull origin Master
git merge <feature-branch>
git push origin Master
```

### **3. Tag Release**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

**📌 Remember**: Master is always production-ready. All development happens in feature branches!