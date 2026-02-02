
text_path = '/tmp/file_attachments/tree/primary%3ADownload%2Fzip4/document/primary%3ADownload%2Fzip4%2FUntitled%20document.txt'
app_path = 'src/App.jsx'

with open(text_path, 'r') as f:
    text_lines = [l.strip() for l in f.readlines() if l.strip()]

with open(app_path, 'r') as f:
    app_lines = [l.strip() for l in f.readlines() if l.strip()]

# Remove my added lines from app_lines for comparison
# import { saveEmail } from './firebase';
# const [email, setEmail] = useState('');
# await saveEmail(email); ...
# <input ... value={email} ... />

# It's easier to just check if every line in text_lines exists in app_lines in roughly the same order.
# Or just print the first difference.

print(f"Text lines: {len(text_lines)}")
print(f"App lines: {len(app_lines)}")

# Find first mismatch
for i in range(min(len(text_lines), len(app_lines))):
    if text_lines[i] != app_lines[i]:
        # Heuristic to skip my added lines
        if "saveEmail" in app_lines[i] or "email" in app_lines[i] or "handleModalSubmit" in app_lines[i]:
            continue

        print(f"Mismatch at line {i}:")
        print(f"Text: {text_lines[i]}")
        print(f"App : {app_lines[i]}")
        break
else:
    print("No mismatch found in overlapping part.")
