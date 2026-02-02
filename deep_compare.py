
import difflib

text_path = '/tmp/file_attachments/tree/primary%3ADownload%2Fzip4/document/primary%3ADownload%2Fzip4%2FUntitled%20document.txt'
app_path = 'src/App.jsx'

def read_clean(path):
    with open(path, 'r', encoding='utf-8-sig') as f: # handle BOM
        lines = [l.rstrip() for l in f.readlines()]
    return lines

text_lines = read_clean(text_path)
app_lines = read_clean(app_path)

# Filter out my added lines from app_lines for fair comparison
filtered_app_lines = []
for line in app_lines:
    if "saveEmail" in line or "const [email, setEmail]" in line or "value={email}" in line:
        continue
    # Also handle the modified handleModalSubmit
    if "const handleModalSubmit = async" in line:
        filtered_app_lines.append("  const handleModalSubmit = (e) => {") # Revert to original signature for comparison
        continue
    if "await saveEmail(email);" in line or "alert(" in line or "try {" in line or "} catch" in line or "console.error" in line or "return;" in line:
        # These are inside my added try/catch block, roughly.
        # But wait, the original had some body too?
        # The original had:
        # e.preventDefault();
        # setShowModal(false);
        # ...
        # My new one has:
        # e.preventDefault();
        # try { ... } catch ...
        # setShowModal(false);
        # ...
        # So I added lines.
        continue

    filtered_app_lines.append(line)

# Now compare text_lines vs filtered_app_lines
# text_lines is shorter (truncated).
# We check if text_lines is a prefix of filtered_app_lines (roughly).

print(f"Text lines: {len(text_lines)}")
print(f"App lines (filtered): {len(filtered_app_lines)}")

diff = list(difflib.unified_diff(text_lines, filtered_app_lines[:len(text_lines)], fromfile='text_file', tofile='app_file', n=0))

if diff:
    print("Found differences:")
    for line in diff:
        print(line)
else:
    print("No differences found in the overlapping section.")
